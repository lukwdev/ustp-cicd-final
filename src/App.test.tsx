// src/App.test.tsx
import { describe, it, expect } from 'vitest';
import { calculateScore, calculateLevel, getDropSpeed, createEmptyBoard } from '@/lib/tetris';

describe('Tetris Game Logic', () => {

    it('calculates score correctly for cleared lines', () => {
        // 1 line at level 1 should be 100 points
        expect(calculateScore(1, 1)).toBe(100);

        // 4 lines (Tetris) at level 1 should be 800 points
        expect(calculateScore(4, 1)).toBe(800);

        // 1 line at level 2 should be 200 points
        expect(calculateScore(1, 2)).toBe(200);
    });

    it('calculates level based on total lines cleared', () => {
        // Level 1: 0-9 lines
        expect(calculateLevel(0)).toBe(1);
        expect(calculateLevel(5)).toBe(1);

        // Level 2: 10 lines
        expect(calculateLevel(10)).toBe(2);

        // Level 3: 20 lines
        expect(calculateLevel(20)).toBe(3);
    });

    it('increases drop speed as level increases', () => {
        const speedLevel1 = getDropSpeed(1);
        const speedLevel5 = getDropSpeed(5);
        const speedLevel10 = getDropSpeed(10);

        // Speed should strictly decrease (lower ms = faster drop)
        expect(speedLevel1).toBeGreaterThan(speedLevel5);
        expect(speedLevel5).toBeGreaterThan(speedLevel10);
    });

    it('creates an empty board with correct dimensions', () => {
        const board = createEmptyBoard();

        // Standard Tetris board is 20 rows high
        expect(board.length).toBe(20);

        // Standard Tetris board is 10 columns wide
        expect(board[0].length).toBe(10);

        // Should be filled with default empty cells (0, null, etc depending on implementation)
        // Assuming your Cell structure, we just check it's defined
        expect(board[0][0]).toBeDefined();
    });
});