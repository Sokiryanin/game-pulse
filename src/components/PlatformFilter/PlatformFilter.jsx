import React, { useEffect, useRef, useState } from 'react';
import { fetchPlatforms } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import {
  Button,
  Menu,
  MenuItem,
  SubMenu,
  Wrapper
} from './PlatformFilter.styled';

export const PlatformFilter = () => {
  const [platforms, setPlatforms] = useState([]);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const wrapperRef = useRef(null);
  const { platformSlug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const data = await fetchPlatforms();
      setPlatforms(data);
    }
    load();
  }, []);

  // Клик вне компонента
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (slug) => {
    navigate(`/games/platform/${slug}`);
    setOpen(false);
  };

  const handleReset = () => {
    navigate('/games');
    setOpen(false);
  };

  const selectedPlatform = (() => {
    for (let group of platforms) {
      if (group.slug === platformSlug) return group.name;
      const sub = group.platforms.find((p) => p.slug === platformSlug);
      if (sub) return sub.name;
    }
    return null;
  })();
  return (
    <Wrapper ref={wrapperRef}>
      <Button
        selected={!!selectedPlatform}
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedPlatform || 'Platforms'}
        <IoIosArrowDown size={16} />
      </Button>

      {open && (
        <Menu>
          <MenuItem onClick={handleReset}>Reset platforms</MenuItem>
          {platforms.map((group) => (
            <MenuItem
              key={group.id}
              onMouseEnter={() => setHovered(group)}
              onClick={() => handleSelect(group.slug)} // ✅ Родительская платформа тоже кликабельна
            >
              {group.name}
              {group.platforms.length > 1 && <IoIosArrowForward />}

              {hovered?.id === group.id && group.platforms.length > 1 && (
                <SubMenu>
                  {group.platforms.map((p) => (
                    <MenuItem
                      key={p.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelect(p.slug); // ✅ Клик по субплатформе
                      }}
                    >
                      {p.name}
                    </MenuItem>
                  ))}
                </SubMenu>
              )}
            </MenuItem>
          ))}
        </Menu>
      )}
    </Wrapper>
  );
};
