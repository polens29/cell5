import datetime

from flask import jsonify, request, Flask
from flask_cors import CORS
from flask_caching import Cache
import twitter

from credentials import *


config = {
    "DEBUG": True,          # some Flask specific configs
    "CACHE_TYPE": "simple", # Flask-Caching related configs
    "CACHE_DEFAULT_TIMEOUT": 60
}
app = Flask(__name__)
# tell Flask to use the above defined config
app.config.from_mapping(config)
cache = Cache(app)

CORS(app, resources=r'/*')

@app.route('/twitter', methods=['GET'])
@cache.cached(timeout=60, query_string=True)
def tweet():
	query = request.args.get('query')
	api = twitter.Api(consumer_key= CONSUMER_KEY,
		consumer_secret=CONSUMER_SECRET,
		access_token_key=ACCESS_TOKEN_KEY,
		access_token_secret=ACCESS_TOKEN_SECRET)

	search = 'q={}%20&result_type=popular&count=20'.format(query)
	results = api.GetSearch(raw_query=search)

	# To test if it caches 1 min
	#return jsonify(datetime.datetime.now())

	data = []
	for item in results:
		data.append(item.id_str)


	return jsonify(data)

app.run()