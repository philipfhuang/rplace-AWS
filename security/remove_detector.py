import boto3
import sys

if len(sys.argv) != 2:
    print("usage: python remove_detector.py detector_id")
    exit(1)

gd_client = boto3.client('guardduty')

detector_id = sys.argv[1]

gd_client.delete_detector(DetectorId=detector_id)