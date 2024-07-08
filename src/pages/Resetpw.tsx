import { Box, Flex, Button } from '@chakra-ui/react';
import Logo from '@/assets/logo.svg?react';
import emotionStyled from '@emotion/styled';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Resetpw = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

    const payload = {
      email,
      password,
    };

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/open-api/user/change-password`, payload);
      if (response.data.result_code === '200') {
        alert('패스워드가 정상적으로 변경되었습니다.');
        navigate('/signin');
      }
    } catch (error) {
      console.error('패스워드 재설정 에러', error);
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
        <Flex flexDirection="column" justify="center" align="center" marginTop="14.6vh">
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
                type="password"
                placeholder="Password *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeypress}
              />
              <InputBox
                type="password"
                placeholder="Confirm Password *"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                _hover={{ border: '.1rem solid var(--color-main)', bg: 'background', color: 'main' }}
                onClick={handleSubmit}>
                Reset Password
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Resetpw;

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
