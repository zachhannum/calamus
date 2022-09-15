import { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useToggle, useIsMount } from '../hooks';

type ToggleSwitchProps = {
  defaultValue?: boolean;
  altColor?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  value?: boolean | undefined;
};

type StyledToggleBaseProps = {
  type: string;
  enabled: boolean;
  disabled: boolean;
};

const StyledToggleBase = styled.div<StyledToggleBaseProps>`
  cursor: ${(p) => (p.disabled ? 'auto' : 'pointer')};
  height: 15px;
  width: 28px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(p) =>
    p.enabled ? p.theme.toggleOnBg : p.theme.toggleOffBg[p.type]};
  border-radius: 8px;
  overflow: hidden;
  user-select: none;
  transition: all 100ms ease-in-out;
  opacity: ${(p) => (p.disabled ? '0.5' : '1')};
`;

type StyledToggleThumbProps = {
  type: string;
  enabled: boolean;
  animate: boolean;
};

const animateThumb = keyframes`
  0% {
    width: 11px;
  }
  50% {
    width: 25px;
  }
  100% {
    width: 11px;
  }
`;

const StyledToggleThumb = styled.div<StyledToggleThumbProps>`
  height: 11px;
  width: 11px;
  border-radius: 8px;
  margin: 4px 2px;
  ${(p) =>
    p.animate &&
    css`
      animation: ${animateThumb} 200ms ease-in-out;
    `}

  margin-left: ${(p) => (p.enabled ? '15px' : '2px')};
  background-color: ${(p) =>
    p.enabled ? p.theme.toggleOnFg : p.theme.toggleOffFg[p.type]};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  user-select: none;
  transition: all 200ms ease-in-out;
`;

const ToggleSwitch = ({
  defaultValue,
  altColor,
  disabled = false,
  onChange,
  value = undefined,
}: ToggleSwitchProps) => {
  const [enabled, toggleValue] = useToggle(defaultValue);
  const [animate, setAnimate] = useState(false);
  const isMount = useIsMount();
  useEffect(() => {
    if (!isMount && !disabled) {
      setAnimate(true);
      if (onChange) onChange(enabled);
      setTimeout(() => {
        setAnimate(false);
      }, 300);
    }
  }, [enabled, onChange, isMount, disabled]);

  useEffect(() => {
    if (value !== undefined) {
      if (value !== enabled) {
        toggleValue();
      }
    }
  }, [value]);

  const handleToggleClicked = () => {
    if (!disabled) toggleValue();
  };

  return (
    <StyledToggleBase
      enabled={enabled}
      disabled={disabled}
      type={altColor ? 'alt' : 'default'}
      onClick={handleToggleClicked}
    >
      <StyledToggleThumb
        animate={animate}
        enabled={enabled}
        type={altColor ? 'alt' : 'default'}
      />
    </StyledToggleBase>
  );
};

ToggleSwitch.defaultProps = {
  defaultValue: false,
  altColor: false,
  disabled: false,
  onChange: () => {},
};

export default ToggleSwitch;
