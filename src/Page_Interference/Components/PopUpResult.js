import React from 'react';
import styled from "styled-components";

const PopupWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const PopUpResult = ({ type, data, onClose }) => {
  const handleButtonClick = () => {
    if (type === "success") {
      window.open(data.createData.url, '_blank');
    }
    onClose();
  };

  return (
    <PopupWrapper onClick={onClose}>
      <PopupContent onClick={e => e.stopPropagation()}>
        {type === "failure" && (
          <>
            <p>動画の作成に失敗しました。初期化タブを押してください。</p>
          </>
        )}
        {type === "success" && (
          <>
            <p>動画の作成が完了しました。</p>
            <Button onClick={handleButtonClick}>動画を見る</Button>
          </>
        )}
      </PopupContent>
    </PopupWrapper>
  );
};

export default PopUpResult;