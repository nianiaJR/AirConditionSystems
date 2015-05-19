require 'sinatra'
require 'json'
require 'mongo'
require 'socket'
include Mongo

helpers do
    def request_server(tag, options = {})
        s = TCPSocket.new 'localhost', 2000
        r = {
            requestTag: tag  
        }
        r.merge! options
        s.write(r.to_json)
        while line = s.gets # Read lines from socket
            resp = JSON.parse line, symbolize_names: true 
        end
        s.close             # close socket when done
        resp
    end
end

before do
    headers 'Access-Control-Allow-Origin' => 'http://localhost:8848',
            'Access-Control-Allow-Credentials' => 'true',
            'Content-Type' => 'application/x-www-form-urlencoded'
end

get '/aircondition' do
    $id = params['id']
    op = {
        id: $id
    }
    resp = request_server 0, op
    if resp[:status].equal? 1
        r = {
            defaultTemp: resp[:temperature].to_i,
            defaultWind: resp[:wind].to_i,
            status: 1
        }
    else
        r = {}
    end

    r.to_json
end

post '/aircondition' do
    json_body = JSON.parse request.body.read, symbolize_names: true
    resp = request_server 1, json_body 
    r = {
        status: true 
    }
    r.to_json
end
