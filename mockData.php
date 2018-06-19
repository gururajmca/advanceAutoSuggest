<?php
error_reporting(-1);
ini_set('display_errors', '1');
$request_body = file_get_contents('php://input');
$data = json_decode($request_body);
if($data->platform) {
  if($data->query == 'A') {
    $mock_data = [
          [
              "id"   => 1,
              "tagname" => "BBB",
              "type" => "entity"
          ],
          [
              "id"   => 2,
              "tagname" => "B is the next",
              "type" => "entity"
          ]
      ];

  } else if($data->query == 'B') {
    $mock_data = [
          [
              "id"   => 1,
              "tagname" => "CCCC",
              "type" => "string"
          ],
          [
              "id"   => 2,
              "tagname" => "C is the next",
              "type" => "string"
          ]
      ];
  } else if($data->query == 'C') {
    $mock_data = [
          [
              "id"   => 1,
              "tagname" => "DDD",
              "type" => "condition"
          ],
          [
              "id"   => 2,
              "tagname" => "D is the next",
              "type" => "condition"
          ]
      ];
  } else {
    $mock_data = [
          [
              "id"   => 1,
              "tagname" => "IAMUser",
              "type" => "entity"
          ],
          [
              "id"   => 2,
              "tagname" => "LastUsedTime",
              "type" => "string"
          ],
          [
              "id"   => 3,
              "tagname" => "isEarlierThen",
              "type" => "entity"
          ],
          [
              "id"   => 4,
              "tagname" => "Password.LastUsedTime",
              "type" => "entity"
          ],
          [
              "id"   => 5,
              "tagname" => "with",
              "type" => "condition"
          ],
          [
              "id"   => 6,
              "tagname" => "NAME",
              "type" => "entity"
          ],
          [
              "id"   => 7,
              "tagname" => "should have",
              "type" => "condition"
          ],
          [
              "id"   => 8,
              "tagname" => "IAMUsers.Name",
              "type" => "entity"
          ],
          [
              "id"   => 9,
              "tagname" => "eq",
              "type" => "condition"
          ],
          [
              "id"   => 10,
              "tagname" => "not",
              "type" => "condition"
          ],
          [
              "id"   => 11,
              "tagname" => "where",
              "type" => "condition"
          ],
          [
              "id"   => 12,
              "tagname" => "root",
              "type" => "string"
          ]
      ];
  }
  // Convert Array to JSON String
  $mock_data = json_encode($mock_data, true);
  echo $mock_data;

} else {
  echo "Other flow";
}
?>
