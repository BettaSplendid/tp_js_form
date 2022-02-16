// a









$("#form_controlee").on("submit", (e) => {
    spinner_love(true);
    e.preventDefault();
    fetchSaveFiles();
    // spinner_love(false);
})


var fileList = [];
var fileInput = document.getElementById('_files')
fileInput.addEventListener('change', function() {
    fileList = []
    for (var i = 0; i < fileInput.files.length; i++) {
        fileList.push(fileInput.files[i]);
    }
});

function spinner_love($da_bool) {
    if ($da_bool) {
        document.getElementById('thing_to_hide').style.visibility = "hidden"
        console.log(2)
    } else {
        document.getElementById('thing_to_hide').style.visibility = "visible"
        console.log(1)
    }
}

function fetchSaveFiles() {
    let authorized_format_file = [
        "image/jpeg",
        "image/jpg",
    ];

    if (fileList.length < 1) {
        alert("Add a File")
        return false;
    }

    if (fileList.length > 3) {
        alert("You can only upload a maximum of 3 files.")
        return false;
    }

    let isImageFile = true;
    fileList.forEach(function(file) {
        if (authorized_format_file.includes(file.type)) {
            saveFiles(file);
        } else {
            alert("Only jpeg or jpg files");
            isImageFile = false;
        }
    });

    return isImageFile;
}

function saveFiles(file) {
    var formData = new FormData();
    formData.set('file', file);
    formData.set('file_name', file.name);

    $.ajax({
        url: "/run.php",
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: formData,
        type: 'post',

        success: function(response) {
            console.log(response)
            console.log({
                response
            })
            response = JSON.parse(response);
            if (response.error !== undefined) {
                return false;
            }
            let mon_message = response[0] ? response[0] : "";
            let html =
                `<div class="px-5">
                <span class="text-light">${mon_message}</span>
                </div>`;

            $("#form_controlee").append($(html));
        },
        error: function(error) {
            console.log(error);
        }

    });
}