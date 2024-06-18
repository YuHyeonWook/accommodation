import { http, HttpResponse } from 'msw';

let lodgment = [
  {
    id: 0,
    image: 'https://picsum.photos/200/300',
    name: '서울 숙소',
    address: '서울시 강남구 역삼동 123-456',
    telephone: '02-1234-5678',
    comment: '서울 중심부에 위치한 아늑한 숙소입니다.',
    room: {
      id: 0,
      name: '객실 1번',
      type: '싱글룸',
      extra_price: 200000,
      price: 100000,
      comment: '방1 입니다.',
      max_person: 1,
    },
  },
  {
    id: 1,
    image: 'https://picsum.photos/200/300',
    name: '강원도 숙소',
    address: '강원도 춘천시 신동면 123-456',
    telephone: '033-1234-5678',
    comment: '강원도 중심부에 위치한 아늑한 숙소입니다.',
    romm: {
      id: 1,
      name: '객실 2번',
      type: '더블룸',
      extra_price: 300000,
      price: 200000,
      comment: '방2 입니다.',
      max_person: 2,
    },
  },
  {
    id: 2,
    image: 'https://picsum.photos/200/300',
    name: '경기도 숙소',
    address: '경기도 수원시 장안구 123-456',
    telephone: '031-1234-5678',
    comment: '경기도 중심부에 위치한 아늑한 숙소입니다.',
    room: {
      id: 2,
      name: '객실 3번',
      type: '트리플룸',
      extra_price: 400000,
      price: 300000,
      comment: '방3 입니다.',
      max_person: 3,
    },
  },
  {
    id: 3,
    image: 'https://picsum.photos/200/300',
    name: '제주도 숙소',
    address: '제주도 제주시 123-456',
    telephone: '064-1234-5678',
    comment: '제주도 중심부에 위치한 아늑한 숙소입니다.',
    room: {
      id: 3,
      name: '객실 4번',
      type: '패밀리룸',
      extra_price: 500000,
      price: 400000,
      comment: '방4 입니다.',
      max_person: 4,
    },
  },
];

export const handlers = [
  http.get('/api/lodgment', () => {
    return HttpResponse.json(lodgment);
  }),
];