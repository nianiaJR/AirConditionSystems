require 'sinatra'
require 'json'
require 'mongo'
require 'socket'
include Mongo

set :port, 9494

get '/test' do
    server = TCPServer.new 2000
    loop do
        client = server.accept
        client.puts "Hello !"
        client.puts "Time is #{Time.now}"
        client.close
    end
end
