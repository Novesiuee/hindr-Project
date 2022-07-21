function formattedAge(age){
    const ageOfUser = new Date().getFullYear() - new Date(age).getFullYear()
    return ageOfUser
}

module.exports = {formattedAge}