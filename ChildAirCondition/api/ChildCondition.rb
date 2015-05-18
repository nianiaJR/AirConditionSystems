require 'sinatra'
require 'json'
require 'mongo'
require 'socket'
include Mongo

before do
    headers 'Access-Control-Allow-Origin' => 'http://localhost:8848',
            'Access-Control-Allow-Credentials' => 'true',
            'Content-Type' => 'application/x-www-form-urlencoded'
end

get '/aircondition' do
    s = TCPSocket.new 'localhost', 2000
    r = {
        requestTag: 0  
    }
    s.write(r.to_json)
    while response = s.gets # Read lines from socket
        config = JSON.parse response, symbolize_names: true 
    end
    s.close             # close socket when done
    
    if config[:status].equal? 1
        r = {
            defaultTemp: config[:temperature].to_i,
            defaultWind: config[:wind].to_i,
            status: 1
        }
    else
        r = {}
    end

    r.to_json
end

post '/aircondition' do
    josn_body = JSON.parse request.body.read, symbolize_names: true
    r = {
        status: true 
    }
    r.to_json
end
