from __future__ import print_function
import time
import uuid
import sys
import socket
import ssl
import elasticache_auto_discovery
from pymemcache.client.hash import HashClient
from pymemcache.client.base import Client

# ElastiCache settings (For serverless clusters)
ssl_context = ssl.create_default_context()
memcache_client = Client(("{your-elasticache-cluster-endpoint}", {port}), tls_context=ssl_context)

# ElastiCache settings (for self-designed clusters)
elasticache_config_endpoint = "your-elasticache-cluster-endpoint:port"
nodes = elasticache_auto_discovery.discover(elasticache_config_endpoint)
nodes = map(lambda x: (x[1], int(x[2])), nodes)
memcache_client = HashClient(nodes)


######
# This function puts into memcache and get from it.
# Memcached is hosted using elasticache
######
def handler(event, context):
    # Create a random UUID... this will be the sample element we add to the cache.
    uuid_in = uuid.uuid4().hex

    # Put the UUID to the cache.
    memcache_client.set('uuid', uuid_in)

    # Get the item (UUID) from the cache.
    uuid_out = memcache_client.get('uuid')

    # Print the results
    if uuid_out == uuid_in:
        # this print should see the CloudWatch Logs and Lambda console.
        print
        "Success: Inserted: %s. Fetched %s from memcache." % (uuid_in, uuid_out)
    else:
        raise Exception("Bad value retrieved :(. Expected %s got %s." % (uuid_in, uuid_out))

    return "Fetched value from Memcached"