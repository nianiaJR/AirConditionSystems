require 'sinatra'
require 'json'
require 'mongo'
require 'socket'
include Mongo

set :port, 9494

$conditions = {}
def read_database(collection, options = {})
    mongo_client = MongoClient.new('localhost')
    db = mongo_client.db('test')
    db.collection(collection).find(options).to_a
end

def write_database(collection, tuple)
    mongo_client = MongoClient.new('localhost')
    db = mongo_client.db('test')
    db.collection(collection).insert(tuple)
end

def update_database(collection, tuple)
    mongo_client = MongoClient.new('localhost')
    db = mongo_client.db('test')
    r = db.collection(collection).find().to_a
    db.collection(collection).update({'_id' => r[0]['_id']}, tuple)
    r = db.collection(collection).find().to_a
end

# 与从控机通信的服务器，专门处理从控机的请求
def process_request()
    server = TCPServer.new 2000
    recv_length = 200
    loop do
        client = server.accept
        request = client.recv(recv_length)
        request = JSON.parse request, symbolize_names: true
        case request[:requestTag]
        # 初始参数请求
        when 0
            coll = read_database 'AirConditionConfigure'
            c = coll[0]
            if c.nil?
                r = {
                    status: 0
                }
            else
                r = {
                    temperature: c['minTemp'],
                    wind: c['minWind'],
                    status: 1
                }
                t = {
                    time: Time.now,
                    wind: c['minWind'],
                    temperature: c['minTemp'],
                    id: request[:id],
                    action: 'open'
                }
                write_database 'use_records', t

                # 存取当前服务的空调
                $conditions[t[:id].to_s] = {
                    wind: c['minWind'],
                    temperature: c['minTemp'],
                    cost: 0
                }
            end
        # 修改参数申请
        when 1
            coll = read_database 'AirConditionConfigure'
            c = coll[0]
            if c.nil?
                r = {
                    status: 0
                }
            else
                f = c['minTemp'] <= request[:curTemp] and\
                    request[:curTemp] <= c['maxTemp'] and\
                    c['minWind'] <= request[:curWind] and\
                    request[:curWind] <= c['maxWind']
                r = {
                    status: f ? 1 : 0
                }

                if f
                    t = {
                        time: Time.now,
                        wind: request[:curWind],
                        temperature: request[:curTemp],
                        id: request[:id],
                        action: 'change'
                    }
                    write_database 'use_records', t

                    #更新当前服务的空调
                    id = request[:id].to_s
                    $conditions[id][:wind] = request[:curWind]
                    $conditions[id][:temperature] = request[:curTemp]
                end
            end
        # 关机告知
        when 2
            r = {
                status: 1
            }
            t = {
                time: Time.now,
                id: request[:id],
                action: 'shut'
            }
            write_database 'use_records', t

            # $conditions.delete request[:id].to_s
        # 检查温度和风速设置是否超过范围
        when 3
            coll = read_database 'AirConditionConfigure'
            c = coll[0]
            if c.nil?
                r ={
                    status: 0
                }
            else
                r = {
                    status: 1,
                    temperature: request[:temperature],
                    wind: request[:wind]
                }
                t = {
                    time: Time.now,
                    id: request[:id],
                    action: 'check',
                    temperature: request[:temperature],
                    wind: request[:wind]
                }
                if r[:wind] < c['minWind']
                    r[:wind] = c['minWind']
                    t[:wind] = c['minWind']
                    t[:action] = 'upwind'
                elsif r[:wind] > c['maxWind']
                    r[:wind] = c['maxWind']
                    t[:wind] = c['maxWind']
                    t[:action] = 'downwind'
                elsif r[:temperature] < c['minTemp']
                    r[:temperature] = c['minTemp']
                    t[:temperature] = c['minTemp']
                    t[:action] = 'uptemperature'
                elsif r[:temperature] > c['maxTemp']
                    r[:temperature] = c['maxTemp']
                    t[:temperature] = c['maxTemp']
                    t[:action] = 'downtemperature'
                end
            end
            write_database 'use_records', t

            #更新当前服务的空调
            id = request[:id].to_s
            $conditions[id][:wind] = request[:wind]
            $conditions[id][:temperature] = request[:temperature]
        when 4
            t = {
                time: Time.now,
                id: request[:id],
                cost: request[:cost]
            }
            r = {
                status: 1
            }
            write_database 'use_costs', t

            cid = request[:id].to_s
            $conditions[cid] = $conditions[cid] || {}
            $conditions[cid][:cost] = ($conditions[cid][:cost] || 0) + request[:cost]
        end
        client.puts r.to_json
        client.close
    end
end

# 新建一个线程，用于并行处理远程的从控机请求
Thread.new{ process_request() }

before do
    headers 'Access-Control-Allow-Origin' => 'http://localhost:8888',
            'Access-Control-Allow-Credentials' => 'true',
            'Content-Type' => 'application/x-www-form-urlencoded'
end

get '/airconditionOn' do
    coll = read_database 'AirConditionConfigure'
    c = coll[0]
    if c.nil?
        resp = {
            status: 0
        }
    else
        resp = {
            minTemp: c['minTemp'],
            maxTemp: c['maxTemp'],
            minWind: c['minWind'],
            maxWind: c['maxWind'],
            status: 1
        }
    end

    resp.to_json
end

get '/airconditions' do
    data = []
    $conditions.map do |k,v|
        data.push({
            k => v
        })
    end
    resp = {
        status: 1,
        data: data
    }

    resp.to_json
end

post '/airconditionOff' do
    resp = {
        status: 1
    }

    resp.to_json
end

post '/configure' do
    json_body = JSON.parse request.body.read, symbolize_names: true
    update_database 'AirConditionConfigure', json_body
    resp = {
        status: 1
    }
    resp.to_json
end
