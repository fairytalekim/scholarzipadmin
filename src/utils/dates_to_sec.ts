interface FirestoreTimestamp {
    seconds: number;
    nanoseconds: number;
}

const datesToSec = (date: "정보없음" | FirestoreTimestamp) => {
    if (date === "정보없음") return 0
    return date.seconds
}

export default datesToSec;