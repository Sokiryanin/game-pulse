import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchYears } from '../../api';

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
`;

const Dropdown = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  background: #111;
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  width: 150px;
`;

const SubDropdown = styled(Dropdown)`
  left: 100%;
  top: 0;
`;

const Item = styled.li`
  padding: 10px;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #333;
  }
`;

export const YearFilter = ({ selected, onChange }) => {
  const [years, setYears] = useState([]);
  const [activeRange, setActiveRange] = useState(null);
  const [hoveredRange, setHoveredRange] = useState(null);

  useEffect(() => {
    async function loadYears() {
      const data = await fetchYears();
      setYears(data);

      console.log(data);
    }
    loadYears();
  }, []);

  const handleSelectRange = (range) => {
    if (range.end_year === null) return; // skip incomplete ranges
    const fullRange = `${range.start_year}-01-01,${range.end_year}-12-31`;
    onChange(fullRange);
    setActiveRange(fullRange);
  };

  const handleSelectYear = (year) => {
    const singleYearRange = `${year}-01-01,${year}-12-31`;
    onChange(singleYearRange);
    setActiveRange(singleYearRange);
  };

  return (
    <Wrapper>
      <Dropdown>
        {years.map((range) => (
          <Item
            key={range.start_year}
            onMouseEnter={() => setHoveredRange(range)}
            onClick={() => handleSelectRange(range)}
          >
            {range.start_year}-{range.end_year}
            {hoveredRange?.start_year === range.start_year &&
              range.years?.length > 0 && (
                <SubDropdown>
                  {range.years.map((y) => (
                    <Item
                      key={y}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectYear(y);
                      }}
                    >
                      {y}
                    </Item>
                  ))}
                  <Item
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectRange(range);
                    }}
                    style={{ color: '#6f6', fontWeight: 'bold' }}
                  >
                    Select all
                  </Item>
                </SubDropdown>
              )}
          </Item>
        ))}
      </Dropdown>
    </Wrapper>
  );
};
