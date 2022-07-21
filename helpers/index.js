function formattedAge(age){
    const ageOfUser = new Date().getFullYear() - new Date(age).getFullYear()
    return ageOfUser
}

function formatDate(date){
    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = seconds / 31536000;

    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }

    return Math.floor(seconds) + " seconds";
}


module.exports = {formattedAge, formatDate}