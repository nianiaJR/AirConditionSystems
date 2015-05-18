require 'sinatra'
require 'json'
require 'mongo'
require 'socket'
include Mongo

set :port, 9494

def processRequest()
    server = TCPServer.new 2000
    recv_length = 200
    loop do
        client = server.accept
        request = client.recv(recv_length)
        request = JSON.parse request, symbolize_names: true
        case request[:requestTag]
        when 0
            mongo_client = MongoClient.new('localhost')
            db = mongo_client.db('test')
            coll = db.collection('AirConditionConfigure').find().to_a
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
            client.puts r.to_json
        end
        client.close
    end    
end

Thread.new{ processRequest() } 

get '/test' do
    puts ">>>>>>>>>>>>>"
end
