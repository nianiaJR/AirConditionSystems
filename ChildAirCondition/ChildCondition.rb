require 'sinatra'
require 'json'
require 'mongo'
require 'socket'
require 'haml'
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

get '/airconditionOn' do
    op = {
        id: params['id']
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
    if resp[:status].equal? 1
        r = {
            status: true 
        }
    else
        r = {}
    end 
    r.to_json
end

post '/airconditionOff' do
    op = {
        id: params['id'] 
    } 
    resp = request_server 2, op 
    if resp[:status].equal? 1
        r = {
            status: 1 
        }
    else 
        r = {}
    end

    r.to_json
end

post '/airconfigure' do
    json_body = JSON.parse request.body.read, symbolize_names: true
    resp = request_server 3, json_body
    if resp[:status].equal? 1
        r = {
            status: 1,
            temperature: resp[:temperature].to_i,
            wind: resp[:wind].to_i
        }
    else
        r = {}
    end

    r.to_json
end

post '/airconditionCost' do
    json_body = JSON.parse request.body.read, symbolize_names: true
    resp = request_server 4, json_body
    if resp[:status].equal? 1
        r = {
            status: 1 
        }
    else
        r = {}
    end

    r.to_json
end

get '/room' do
    haml :index
end
