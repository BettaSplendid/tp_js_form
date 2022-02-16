<?php



define(
    'IS_AJAX',
    isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'
);

if (!IS_AJAX) {
    die('restricted access');
}

$file = isset($_FILES['file']['tmp_name']) ? $_FILES['file']['tmp_name'] : '';
$responses = ['error' => 'false'];
$file_name = $_POST['file_name'];

if (isset($_POST['file'])) {
    if ($_POST['file'] === 'undefined') {
        $responses[] = 'nonewfiles';
    }
}

if ($file !== '') {
    if (0 < $_FILES['file']['error']) {
        _addError();
        $responses[] = 'Erreur d\'upload';
    } else {
        $authorized_format_file = [
            "image/jpeg",
            "image/jpg",
        ];

        if (!in_array($_FILES['file']["type"], $authorized_format_file)) {
            $responses[] = 'Format Invalide';
            _addError();
        }

        while (is_dir($folder_user = "vds_" . ((string) rand(10000, 990000) . '_' . time()))) {
            $folder_user = "vds_" . ((string) rand(10000, 990000) . '_' . time());
        }

        mkdir($folder_user, 0755);

        // $responses[] = $folder_user;
        // chown($folder_user, "root");


        if (move_uploaded_file($_FILES['file']['tmp_name'], $folder_user . '/' . $file_name)) {
            $responses[] = 'Convert successfully';
            shell_exec('python3 lapin.py');
        } else {
            $responses[] = 'Convert with errors';
        }
    }
}

if ($responses['error'] = 'false') {
    unset($responses['error']);
}

print json_encode($responses);

function _addError()
{
    $responses['error'] = 'true';
    print json_encode($responses);
    exit;
}
