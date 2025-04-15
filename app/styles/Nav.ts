import styled from "styled-components";

export const Logo = styled.img`
  position: absolute;
  width: 56px;
  height: 38px;
  left: 100px;
`;

export const LogoText = styled.span`
  font-family: Pretendard;
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 36px;
  color: #6938EF;

  position: absolute;
  left: 180px;
`;

export const Component = styled.div`
  width: 100%;
  height: 88px;
  background: #FFFFFF;
  user-select: none;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavContainer = styled.div`
  width: 100%;
  height: 88px;
  z-index: 1000;
  user-select: none;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;
  top: 0;
`;

export const IconContainer = styled.div`
  position: absolute;
  right: 291px;

  display: flex;
  flex-direction: row;
  gap: 39px;
`;

export const HomeWrapper = styled.div`
  width: 64px;
  height: 64px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HomeIcon = styled.img`
  width: 37px;
  height: 37px;
`;

export const FolderWrapper = styled.div`
  width: 64px;
  height: 64px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FolderIcon = styled.img`
  width: 37px;
  height: 37px;
`;

export const SettingWrapper = styled.div`
  width: 64px;
  height: 64px;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SettingIcon = styled.img`
  width: 37px;
  height: 37px;
`;

export const Login = styled.img`
  width: 60px;
  height: 60px;
  position: absolute;
  right: 170px;
  cursor: pointer;
`;

export const LoginHoverBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  position: absolute;
  top: 70px;
  right: 140px;
  z-index: 10;

  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  padding: 16px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const Text = styled.span`
  font-family: 'Pretendard Variable', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #000;
  cursor: pointer;
`;
