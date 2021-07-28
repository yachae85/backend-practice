const people = [
  {
    age: 20,
    city: "서울",
    pet: ["cat", "dog"],
  },
  {
    age: 40,
    city: "부산",
  },
  {
    age: 31,
    city: "대구",
    pet: ["cat", "dog"],
  },
  {
    age: 36,
    city: "서울",
  },
  {
    age: 27,
    city: "부산",
    pet: "cat",
  },
  {
    age: 24,
    city: "서울",
    pet: "dog",
  },
];

/*
A. 30대 미만이 한 명이라도 사는 모든 도시
B. 각 도시별로 개와 고양이를 키우는 사람의 수
*/

// A

function city30() {
  return Array.from(
    new Set(people.filter((p) => p.age < 30).map((p) => p.city)) // 이렇게 구현하는게 좀 더 명확
  );
}

console.log(city30());

// B

function catDog() {
  return people
    .map(({ pet: petOrPets, city }) => {
      const pets =
        (typeof petOrPets === "string" ? [petOrPets] : petOrPets) || [];

      return {
        city,
        pets,
      };
    })
    .flatMap(({ city, pets }) => pets.map((pet) => [city, pet]))
    .reduce((result, [city, pet]) => {
      if (!city || !pet) return result;

      return {
        ...result,
        [city]: {
          ...result[city],
          [pet]: (result[city]?.[pet] || 0) + 1,
        },
      };
    }, {});
}

console.log(catDog());
