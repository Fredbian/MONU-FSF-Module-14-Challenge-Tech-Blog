function formatDate(date){
    console.log(date);
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
        date).getFullYear()}`
}

module.exports ={ 
    formatDate
}