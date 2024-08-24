import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 20px auto;
  position: relative;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.div`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownMenu = styled.ul<{ $isOpen: boolean }>`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: ${(props) => (props.$isOpen ? "block" : "none")};
`;

const Option = styled.li`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Chevron = styled.span<{ $isOpen: boolean }>`
  border-style: solid;
  border-width: 4px 4px 0 4px;
  border-color: ${(props) => (props.$isOpen ? "transparent transparent #000 transparent" : "#000 transparent transparent transparent")};
  display: inline-block;
  margin-left: 10px;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

interface DropdownProps {
  label: string;
  options: string[];
  onSelect: (option: string) => void; // Añadido
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option); // Llamar al callback cuando se selecciona una opción
  };

  return (
    <Container>
      <Label>{label}</Label>
      <Input onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || "Selecciona una opción"}
        <Chevron $isOpen={isOpen} />
      </Input>
      <DropdownMenu $isOpen={isOpen}>
        {options.map((option, index) => (
          <Option key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </Option>
        ))}
      </DropdownMenu>
    </Container>
  );
};
export default Dropdown;