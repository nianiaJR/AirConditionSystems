require 'sinatra'
require 'json'
require 'mongo'
require 'socket'
include Mongo

set :port, 9494

@conditions = {}
def read_database(collection)
    mongo_client = MongoClient.new('localhost')
    db = mongo_client.db('test')
    db.collection(collection).find().to_a
end

def write_database(collection, tuple)
    mongo_client = MongoClient.new('localhost')
    db = mongo_client.db('test')
    db.collection(collection).insert(tuple)
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
                @conditions[t[:id].to_s] = {
                    wind: c['minWind'],
                    temperature: c['minTemp']
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
                    @conditions[request[:id].to_s] = {
                        wind: request[:curWind],
                        temperature: request[:curTemp]
                    }
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

            @conditions.delete request[:id].to_s
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

post '/airconditionOff' do
    resp = {
        status: 1
    }

    resp.to_json
end
