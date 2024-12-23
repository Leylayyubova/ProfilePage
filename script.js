function profileData() {
    return {
        profilePicUrl: 'default-profile.jpg',
        bio: 'Bu alana biyografinizi yazabilirsiniz.', 
        newPost: '',
        posts: [],

        selectFile() {
            this.$refs.fileInput.click();  
        },

        handleFileChange(event) {
            const file = event.target.files[0];  
            if (file) {
                this.uploadProfilePic(file);
            }
        },

        uploadProfilePic(file) {
            const formData = new FormData();
            formData.append('profilePic', file);

            fetch('/upload-profile-pic', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    this.profilePicUrl = data.imageUrl; 
                } else {
                    alert('Profil resmi yüklenemedi.');
                }
            })
            .catch(error => {
                console.error('Hata:', error);
                alert('Bir hata oluştu.');
            });
        },

        editBio() {
            const newBio = prompt("Biyografinizi yazın:", this.bio);
            if (newBio !== null) {
                this.bio = newBio;
            }
        },

        createPost() {
            if (this.newPost.trim()) {
                this.posts.push(this.newPost.trim()); 
                this.newPost = ''; 
            }
        }
    }
}
