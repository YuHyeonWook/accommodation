import { useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import Logo from '../assets/logo.svg?react';
import emotionStyled from '@emotion/styled';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (email === '') {
      alert('이메일을 입력해주세요.');
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
      alert('비밀번호는 영어와 숫자를 포함한 8자 이상이어야 합니다.');
      return;
    }

    if (password !== confirmPassword) {
      alert('패스워드가 일치하지 않습니다.');
      return;
    }

    if (name === '') {
      alert('이름을 입력해주세요.');
      return;
    }

    if (!/^\d{2,3}-\d{3,4}-\d{4}$/.test(phoneNumber)) {
      alert('전화번호를 양식에 맞게 입력해주세요.\nex) 00-000-0000\nex) 000-0000-0000');
      return;
    }

    const payload = {
      name,
      email,
      password,
      phone_number: phoneNumber,
    };

    try {
      const response = await axios.post(`${process.env.VITE_API_URL}/open-api/user/register`, payload);
      if (response.data.result_code === '201') {
        alert('회원가입이 정상적으로 처리되었습니다.');
        navigate('/signin');
      }
    } catch (error) {
      console.error('회원가입 에러', error);
      alert('회원가입에 실패하였습니다.');
    }
  };

  const handleKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Box position="relative" height="100vh" backgroundColor="background">
      <Box
        position="absolute"
        top="0"
        bottom="0"
        left="0"
        right="0"
        width="41.7vw"
        height="68.4vh"
        margin="auto"
        backgroundColor="white">
        <Flex flexDirection="column" justify="center" align="center" marginTop="8vh">
          <Logo />
          <Box marginTop="4.9vh">
            <Flex flexDirection="column" justify="center" align="center">
              <InputBox
                placeholder="E-mail *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeypress}
              />
              <InputBox
                placeholder="Password *"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeypress}
              />
              <InputBox
                placeholder="Confirm Password *"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeypress}
              />
              <InputBox
                placeholder="Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeypress}
              />
              <InputBox
                placeholder="Phone Number *"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                onKeyPress={handleKeypress}
              />
              <Button
                width="27.8vw"
                height="4.9vh"
                marginTop="2vh"
                borderRadius=".5rem"
                backgroundColor="main"
                fontSize="1.5rem"
                color="white"
                onClick={handleSubmit}
                _hover={{ bg: 'background', border: '.1rem solid var(--color-main)', color: 'main' }}>
                Sign up
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default SignUp;

const InputBox = emotionStyled.input`
  width : 27.8vw;
  height: 4.9vh;
  margin-top: 2vh;
  padding: 2.6vh 2.1vw;
  border: .1rem solid var(--color-main);
  border-radius: .5rem;

  font-size: 1.5rem;
  color: var(--color-main);

  outline: none;
`;
