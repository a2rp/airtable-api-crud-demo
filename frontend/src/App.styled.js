import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div`
        min-height: 100vh;
        padding: 40px 20px;
        background: var(--color-bg-soft);
        color: var(--color-text);

        .container {
            max-width: 1000px;
            margin: 0 auto;
        }

        h1 {
            margin-bottom: 8px;
        }

        p {
            margin-bottom: 24px;
            color: var(--color-text-muted);
        }

        /* =========================
           FORM
        ========================= */

        .form {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 12px;
            margin-bottom: 24px;
        }

        input,
        select,
        button {
            padding: 12px;
            border-radius: 8px;
            border: 1px solid var(--color-border);
            outline: none;
            background: var(--color-card);
            color: var(--color-text);
        }

        input::placeholder {
            color: var(--color-text-muted);
        }

        select {
            cursor: pointer;
        }

        button {
            background: var(--color-primary);
            color: #020617;
            font-weight: 700;
            cursor: pointer;
            border: none;
            transition: all 0.2s ease;
        }

        button:hover {
            background: var(--color-primary-hover);
            transform: translateY(-1px);
        }

        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        .cancel {
            background: #64748b;
            color: #ffffff;
        }

        .cancel:hover {
            background: #475569;
        }

        /* =========================
           TABLE
        ========================= */

        .tableBox {
            overflow-x: auto;
            background: var(--color-card);
            border-radius: 12px;
            box-shadow: var(--shadow-soft);
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            padding: 14px;
            border-bottom: 1px solid var(--color-border);
            text-align: left;
        }

        th {
            color: #93c5fd;
            font-size: 14px;
        }

        tr:hover td {
            background: rgba(255, 255, 255, 0.02);
        }

        td button {
            margin-right: 8px;
            padding: 8px 12px;
            font-size: 13px;
        }

        .delete {
            background: var(--color-danger);
            color: #ffffff;
        }

        .delete:hover {
            background: #dc2626;
        }

        .empty {
            text-align: center;
            color: var(--color-text-muted);
            padding: 28px;
        }

        /* =========================
           STATUS BADGES
        ========================= */

        .status {
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            display: inline-block;
        }

        .status.active {
            background: rgba(56, 189, 248, 0.15);
            color: #38bdf8;
        }

        .status.pending {
            background: rgba(251, 191, 36, 0.15);
            color: #facc15;
        }

        .status.blocked {
            background: rgba(239, 68, 68, 0.15);
            color: #ef4444;
        }

        /* =========================
           LOADER
        ========================= */

        .loaderBox {
            min-height: 180px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 14px;
            background: var(--color-card);
            border-radius: 12px;
            box-shadow: var(--shadow-soft);
        }

        .loaderBox p {
            margin: 0;
            color: var(--color-text-muted);
        }

        .spinner {
            width: 42px;
            height: 42px;
            border: 4px solid var(--color-border);
            border-top-color: var(--color-primary);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
            to {
                transform: rotate(360deg);
            }
        }

        /* =========================
           RESPONSIVE
        ========================= */

        @media (max-width: 900px) {
            .form {
                grid-template-columns: 1fr;
            }
        }
    `,
};
