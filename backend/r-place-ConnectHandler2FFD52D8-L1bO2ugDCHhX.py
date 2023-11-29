import redis

redis_endpoint = "redis-wqvx0c.serverless.use2.cache.amazonaws.com"
port = 6379
redis_client = redis.Redis(host=redis_endpoint, port=port, decode_responses=True)


def handler(event, context):
    board = redis_client.get('board')

    if board is None:
        return None
    else:
        print(f"Retrieved entire board successfully.")
        return board
