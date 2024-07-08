import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.VITE_API_URL}`,
});

instance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰을 반환
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    if (accessToken) {
      // 토큰이 있으면 Authorization 헤더에 추가
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;

// 전체 상품 조회 (숙박)
export const fetchAccommodation = async (
  cursor: number,
  keyword: string,
  start: string,
  end: string,
  count: number,
) => {
  return instance.get('/open-api/accommodation', {
    params: {
      cursor,
      keyword,
      start,
      end,
      count,
    },
  });
};

// 개별 상품 조회 (숙박, 객실)
export const fetchAccommodationById = (accommodationId: string) => {
  return instance.get(`/open-api/accommodation/${accommodationId}`);
};

// 전체 객실 조회
export const fetchRoomList = (accommodationId: string) => {
  return instance.get(`/open-api/accommodation/${accommodationId}/room`);
};

// 장바구니 조회
export const fetchCartItems = () => {
  return instance.get('/api/user/cartItems');
};

// 장바구니 생성
export const fetchCreateCartItems = (payload: { roomId: string }) => {
  return instance.post('/api/user/cartItems', payload);
};

// 장바구니 삭제
export const fetchDeleteCartItems = (cartItemId: number) => {
  return instance.delete('/api/user/cartItems', {
    data: { cartItemIdList: [cartItemId] },
  });
};

// 장바구니 모두 삭제
export const fetchDeleteAllCartItems = () => {
  return instance.delete('/api/user/cartItems/delete-all');
};

// 주문하기
export const createOrder = async (orderData: any) => {
  try {
    const response = await instance.post('/api/order', orderData);
    return response;
  } catch (error) {
    console.error('오류: 주문 내역 생성 실패. (주문하기)', error);
    throw error;
  }
};

// 주문확인
export const fetchOrderById = async (orderId: string) => {
  try {
    const response = await instance.get(`/api/order/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('오류: 주문 내역 불러오기 실패. (결제 확인)', error);
    throw error;
  }
};

// 주문내역 확인
export const fetchOrderHistory = async () => {
  try {
    const response = await instance.get('/api/order');
    return response.data;
  } catch (error) {
    console.error('오류: 주문 내역 불러오기 실패.', error);
    throw error;
  }
};
