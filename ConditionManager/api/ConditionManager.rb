require 'sinatra'
require 'json'
require 'mongo'
require 'socket'
include Mongo

set :port, 9494

def read_database(collection)
    mongo_client = MongoClient.new('localhost')
    db = mongo_client.db('test')
    db.collection(collection).find().to_a
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
            config = coll[0] 
            if config.nil?
                r = {
                    status: 0    
                }
            else
                r = {
                    temperature: config['minTemp'],
                    wind: config['minWind'],
                    status: 1
                }
            end
        when 1

        end
        client.puts r.to_json
        client.close
    end    
end

# 新建一个线程，用于并行处理远程的从控机请求
Thread.new{ process_request() } 

get '/test' do
    puts ">>>>>>>>>>>>>"
end
