import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import anime from 'animejs';

// Define una interfaz para los elementos de data
interface MenuItem {
  name: string;
  link: string;
}

// Define una interfaz para las propiedades del componente
interface MenuDropdownProps {
  data: MenuItem[];
  name: string;
}

const Background = styled.div<{ $isOpen: boolean }>`
  position: relative;

  background-color: ${props => (props.$isOpen ? 'rgba(0, 0, 0, 0.1)' : 'transparent')}; // Color de fondo del menú
  transition: background-color 0.3s ease;
  /* border-radius: var(--radius-m);
  margin: 1rem; */

  div{
    text-align: left !important;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition: max-height 0.5s ease, opacity 0.5s ease;
 

  a{
    font-weight: normal !important;
    font-size: var(--font-size-xxxs);
    text-align: left;
    margin-left: 1rem;

    transition: 0.5s all ease;
    border-radius: var(--radius-m);
    padding: 1rem;

   
    &:hover{
      background-color: rgba(0 0 0 / 10%);
      
    }
  }
`;

const MenuDropdown: React.FC<MenuDropdownProps> = ({ data, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(prevState => !prevState);
  };

  useEffect(() => {
    if (optionsRef.current) {
      if (isOpen) {
        anime({
          targets: optionsRef.current,
          maxHeight: [0, optionsRef.current.scrollHeight],
          opacity: [0, 1],
          duration: 150,
          easing: 'easeOutQuad'
        });
      } else {
        anime({
          targets: optionsRef.current,
          maxHeight: [optionsRef.current.scrollHeight, 0],
          opacity: [1, 0],
          duration: 150,
          easing: 'easeOutQuad'
        });
      }
    }
  }, [isOpen]);

  return (
    <Background $isOpen={isOpen} onClick={toggleMenu}>
      <div>
        <Link to="#">{name}</Link>
      </div>
      <OptionsContainer ref={optionsRef}>
        {data.map((item, index) => (
          <Link key={index} to={item.link}>{`> ${item.name}`}</Link>
        ))}
      </OptionsContainer>
    </Background>
  );
};

export default MenuDropdown;