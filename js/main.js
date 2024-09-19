const photosArr = Array(25).fill(null);

const messages = [
    "Все відмінно!",
    "Загалом все непогано. Але не всі.",
    "Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.",
    "Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.",
    "Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.",
    "Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?"
  ];

  const names = ["Олена", "Артем", "Максим", "Ірина", "Дмитро", "Марія", "Олексій", "Софія", "Андрій", "Наталя"];

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateComments() {
    const commentsCount = getRandomNumber(1, 10); 
    const comments = [];
  
    for (let i = 0; i < commentsCount; i++) {
      const numMessages = getRandomNumber(1, 2); 
      const selectedMessages = [];
      
      for (let j = 0; j < numMessages; j++) {
        let randomMessage;
        do {
          randomMessage = messages[getRandomNumber(0, messages.length - 1)];
        } while (selectedMessages.includes(randomMessage));
        selectedMessages.push(randomMessage);
      }
      
      comments.push({
        id: getRandomNumber(100, 999),
        avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg', 
        message: selectedMessages.join(' '), 
        name: names[getRandomNumber(0, names.length - 1)] 
      });
    }
  
    return comments;
  }


  photosArr.forEach(function(_, i, arr) {
    arr[i] = {
      id: i + 1, 
      url: 'photos/' + (i + 1) + '.jpg', 
      description: 'Опис фотографії номер ' + (i + 1), 
      likes: getRandomNumber(15, 200), 
      comments: generateComments() 
    };
  });
  
  console.log(JSON.stringify(photosArr, null, 2));
