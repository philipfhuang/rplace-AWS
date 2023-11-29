import redis

redis_endpoint = "redis-wqvx0c.serverless.use2.cache.amazonaws.com"
port = 6379
redis_client = redis.Redis(host=redis_endpoint, port=port, decode_responses=True)


def handler(event, context):
    time = event.get('time')
    user = event.get('user')
    color = event.get('color')  # Each color is 4 bits

    coordinate = event.get('coordinate')
    x = coordinate.split(',')[0]
    y = coordinate.split(',')[1]

    # Update board in redis
    redis_client.get('board')
    offset = (int(x) + int(y) * 1000) * 4
    color_bits = format(color, '04b')
    for i in range(4):
        bit = color_bits[i]
        redis_client.setbit('board', offset + i, bit)
