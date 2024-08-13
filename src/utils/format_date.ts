const formatDate = (fbDate: any) => {
    if (!fbDate) return "정보없음";
    const milliseconds = fbDate.seconds * 1000
    const date = new Date(milliseconds);
    const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    if (!milliseconds) return "정보없음";
    return formattedDate;
};

export default formatDate;