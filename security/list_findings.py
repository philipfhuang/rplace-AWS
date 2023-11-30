import boto3

gd_client = boto3.client('guardduty')

response = gd_client.list_detectors()

detectors = response['DetectorIds']

for detector_id in detectors:
    findings_response = gd_client.list_findings(DetectorId=detector_id)
    findings = findings_response['FindingIds']
    print(f"Findings for Detector ID {detector_id}:")
    for finding_id in findings:
        finding_info = gd_client.get_findings(DetectorId=detector_id, FindingIds=[finding_id])
        finding_details = finding_info['Findings'][0]
        print(f"Finding ID: {finding_details['Id']}")
        print(f"Title: {finding_details['Title']}")
        print(f"Severity: {finding_details['Severity']}")
        print("------------------------------")