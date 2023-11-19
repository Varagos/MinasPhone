import { renderHook, act } from '@testing-library/react-hooks';
import { useRouter } from 'next/navigation';

const PUSH_MOCK = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: PUSH_MOCK,
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mocks for useRouter and useSearchParams
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
    };
  },
}));

import useUrl from '@/hooks/useUrl';
describe('useUrl Hook', () => {
  beforeEach(() => {
    // jest.clearAllMocks();
    PUSH_MOCK.mockReset();
  });

  it('should update URL when setRange is called', () => {
    const { result } = renderHook(() => useUrl('http://domain.com/posts'));

    // Act
    act(() => {
      result.current.setRange([0, 10]);
    });

    // Assert
    expect(PUSH_MOCK).toHaveBeenCalledTimes(1);
    const push_mock_argument = PUSH_MOCK.mock.calls[0][0];
    console.log(push_mock_argument);
    expect(push_mock_argument).toContain('range=');
  });

  // Add more tests for setSort, setFilter, etc.
});
