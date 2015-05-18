require 'sinatra'
require 'json'
require 'mongo'
require 'socket'
include Mongo

before do
    headers 'Access-Control-Allow-Origin' => 'http://localhost:8848',
            'Access-Control-Allow-Credentials' => 'true'
=begin
    $mongo_client = MongoClient.new("localhost")
    $db = $mongo_client.db('test')
    coll = $db.collection("testCollection")
    r = {
        name: "mongoDB",
        type: "database",
        count: 1,
        info: {
            x: 203,
            y: 102
        }
    }
    coll.insert(r)
    coll.find(name: "mongoDB").to_a.each do |e|
        puts e,">>>>>>>>"
    end
=end
end

get '/test' do
    s = TCPSocket.new 'localhost', 2000
    r = {
        requestTag: 0  
    }
    s.write(r.to_json)
    while response = s.gets # Read lines from socket
        r = JSON.parse response, symbolize_names: true 
        puts r,">>>>>>yyyy"
    end
    s.close             # close socket when done
end

get '/aircondition' do
    r = {
        defaultTemp: 23,
        defaultWind: 0
    }
    r.to_json
end

post '/aircondition' do
    r = {
        isOk: true 
    }
    r.to_json
end
