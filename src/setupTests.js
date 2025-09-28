import '@testing-library/jest-dom'

// Mock Chart.js to avoid canvas issues in tests
jest.mock('chart.js', () => ({
  Chart: {
    register: jest.fn(),
  },
  CategoryScale: jest.fn(),
  LinearScale: jest.fn(),
  PointElement: jest.fn(),
  LineElement: jest.fn(),
  Title: jest.fn(),
  Tooltip: jest.fn(),
  Legend: jest.fn(),
  Filler: jest.fn(),
}))

// Mock react-chartjs-2
jest.mock('react-chartjs-2', () => ({
  Line: () => <div>Commit Frequency Over Time</div>,
}))