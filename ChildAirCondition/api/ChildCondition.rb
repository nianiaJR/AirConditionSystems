require 'sinatra'
require 'json'
require 'mongo'
require 'socket'

before do
    headers 'Access-Control-Allow-Origin' => 'http://localhost:8848',
            'Access-Control-Allow-Credentials' => 'true'
    include Mongo
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
end

get '/hi' do
    "Hello World!"
    puts params,">>>>>>>>>>>>"
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
