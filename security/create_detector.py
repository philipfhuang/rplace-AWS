import boto3

gd_client = boto3.client('guardduty')

gd_client.create_detector(Enable=True, FindingPublishingFrequency='FIFTEEN_MINUTES')
