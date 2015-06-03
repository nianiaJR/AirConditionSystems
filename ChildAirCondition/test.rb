require 'sinatra'
require 'haml'

get '/aa' do
    haml '%div.title Hello World'
end
