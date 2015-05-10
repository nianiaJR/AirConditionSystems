require 'sinatra'
require 'json'

before do
    headers 'Access-Control-Allow-Origin' => 'http://localhost:8848',
            'Access-Control-Allow-Credentials' => 'true'
end

get '/hi' do
    "Hello World!"
    puts params,">>>>>>>>>>>>"
end

get '/aircondition' do
    r = {
        defaultTemp: '23',
        defaultWind: '0'
    }
    r.to_json
end
