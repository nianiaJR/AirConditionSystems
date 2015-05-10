require 'sinatra'

before do
    headers 'Access-Control-Allow-Origin' => 'http://localhost:8848',
            'Access-Control-Allow-Credentials' => 'true'
end

get '/hi' do
    "Hello World!"
    puts params,">>>>>>>>>>>>"
end
