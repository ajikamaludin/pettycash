import React, { useState, useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import { Head, useForm } from "@inertiajs/react";
import styled from "styled-components";
import { formatIDR } from "@/Utils";

const Table = styled.table`
    border: 1px solid black;
    border-collapse: collapse;
    max-width: 100%;
    width: 100%;
    height: 20px;
    font-family: "babyblue";
`;

const Th = styled.th`
    /* border: 1px solid black;
    border-collapse: collapse; */
    width: 100px;
    height: 20px;
`;

const Td = styled.td`
    border: 1px solid black;
    border-collapse: collapse;
    height: 20px;
`;

const Img = styled.img`
    width: 30px;
    height: auto;
`;

const Print = React.forwardRef((props, ref) => {
    const [items, setItems] = useState([])
    const { name, expenses } = props

    useEffect(() => {
        const isExists = expenses.find(i => i.isChecked === true)
        if (isExists !== undefined) {
            setItems(expenses.filter(i => i.isChecked))
            return
        }
        setItems(expenses)
    }, [expenses])

    return (
        <>
            <div ref={ref} className="p-1 bg-white">
                <Table>
                    <thead>
                        <tr>
                            <Th colSpan={10}></Th>
                        </tr>
                        <tr>
                            <Th colSpan={6} rowSpan={2}>
                                <div className="flex gap-2 text-md justify-center items-center">
                                    <Img
                                        src="/img/yamato-cash-portal-logo-print.png"
                                        className="h-28 w-auto"
                                        alt=""
                                    />
                                    PT.Multisarana Bahteramandiri
                                </div>
                            </Th>

                            <Th colSpan={4}>
                                <div className="flex items-end justify-end min-h-full">
                                    NO. : ______________
                                </div>
                            </Th>
                        </tr>
                        <tr>
                            <Th colSpan={4} className="">
                                <div className="flex items-end justify-end min-h-full">
                                    Date :
                                    <span className="underline">
                                        {new Date().toLocaleDateString("en-CA")}
                                        _____
                                    </span>
                                </div>
                            </Th>
                        </tr>
                        <tr>
                            <Th colSpan={6} className="text-center">
                                Advance Requisition Voucher
                            </Th>
                            <Th colSpan={4}></Th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <Td
                            colSpan={5}
                            className="text-sm text-center"
                            style={{ borderRight: 0 }}
                        >
                            NAME : {name}
                        </Td>
                        <Td
                            colSpan={5}
                            className="text-sm text-center"
                            style={{ borderLeft: 0 }}
                        >
                            DEPARTMENT : Operation___
                        </Td>
                    </tr>
                    <tr>
                        <Td className="text-sm w-1/12 text-center">NO.</Td>
                        <Td colSpan={4} className="text-sm text-center w-5/12">
                            DESCRIPTION
                        </Td>
                        <Td className="text-sm text-center w-2/12">AMOUNT</Td>
                        <Td colSpan={2} className="text-sm w-2/12"></Td>
                        <Td colSpan={2} className="text-sm text-center">
                            APPROVED
                        </Td>
                    </tr>
                    <tr>
                        <Td className="w-1/12"> </Td>
                        <Td colSpan={4}> </Td>
                        <Td> </Td>
                        <Td colSpan={2} rowSpan={2}>
                            <div className="flex items-end min-h-full">
                                DEPT.MANAGER
                            </div>
                        </Td>
                        <Td rowSpan={5} className="">
                            <div className="flex items-end min-h-full">
                                DIRECTOR
                            </div>
                        </Td>
                    </tr>
                    <tr>
                        <Td className="w-1/12"> </Td>
                        <Td colSpan={4}> </Td>
                        <Td> </Td>
                    </tr>
                    <tr>
                        <Td className="w-1/12"> </Td>
                        <Td colSpan={4}> </Td>
                        <Td> </Td>
                        <Td colSpan={2} rowSpan={3}>
                            <div className="flex items-end min-h-full">
                                REQUESTED
                            </div>
                        </Td>
                    </tr>
                    <tr>
                        <Td className="w-1/12"> </Td>
                        <Td colSpan={4}> </Td>
                        <Td> </Td>
                    </tr>
                    <tr>
                        <Td className="w-1/12"> </Td>
                        <Td colSpan={4}>
                            <div className="flex justify-center items-end min-h-full">
                                TOTAL
                            </div>
                        </Td>
                        <Td> </Td>
                    </tr>
                    <tr>
                        <Td className="w-1/12" colSpan={10}>
                            ASLI PAYMENT SLIP
                        </Td>
                    </tr>
                    <tr>
                        <Td className="w-1/12">
                            <div className="flex justify-center items-end min-h-full">
                                NO.
                            </div>
                        </Td>
                        <Td colSpan={7}>
                            <div className="flex justify-center items-end min-h-full">
                                DESCRIPTION
                            </div>
                        </Td>
                        <Td colSpan={2}>
                            <div className="flex justify-center items-end min-h-full">
                                AMOUNT
                            </div>
                        </Td>
                    </tr>
                    {/* <tr>{JSON.stringify(props)}</tr> */}
                    {items.map((expense, index) => (
                        <tr key={expense.id}>
                            <Td className="w-1/12">
                                <div className="flex justify-center items-center min-h-full">
                                    {index + 1}
                                </div>
                            </Td>
                            <Td colSpan={7}>
                                <div className="flex justify-start items-end min-h-full">
                                    {`${
                                        expense.job_number !== null
                                            ? expense.job_number
                                            : ""
                                    } ${expense.description}`}
                                </div>
                            </Td>
                            <Td colSpan={2}>
                                <div className="flex justify-end items-end min-h-full">
                                    {`Rp.` + formatIDR(expense.amount)}
                                </div>
                            </Td>
                        </tr>
                    ))}
                    <tr>
                        <Td className="w-1/12"></Td>
                        <Td colSpan={7}>
                            <div className="flex justify-end items-end min-h-full">
                                TOTAL USED
                            </div>
                        </Td>
                        <Td colSpan={2}>
                            <div className="flex justify-center items-end min-h-full">
                                {`Rp.` +
                                    formatIDR(
                                        items
                                            .map((a) => a.amount)
                                            .reduce((a, b) => +a + +b, 0)
                                    )}
                            </div>
                        </Td>
                    </tr>
                    <tr>
                        <Td className="w-1/12"></Td>
                        <Td colSpan={7}>
                            <div className="flex justify-end items-end min-h-full">
                                TOTAL ADVANCE
                            </div>
                        </Td>
                        <Td colSpan={2}>
                            <div className="flex justify-center items-end min-h-full"></div>
                        </Td>
                    </tr>
                    <tr>
                        <Td className="w-1/12"></Td>
                        <Td colSpan={7}>
                            <div className="flex justify-end items-end min-h-full">
                                BALANCE
                            </div>
                        </Td>
                        <Td colSpan={2}>
                            <div className="flex justify-center items-end min-h-full"></div>
                        </Td>
                    </tr>
                    </tbody>
                    <tfoot>
                        <tr className="h-16">
                            <Td colSpan={2}>
                                <div className="flex justify-center items-end min-h-full">
                                    REQUESTORS
                                </div>
                            </Td>
                            <Td colSpan={3}>
                                <div className="flex justify-center items-end min-h-full">
                                    FINANCE MANAGER
                                </div>
                            </Td>
                            <Td colSpan={2}>
                                <div className="flex justify-center items-end min-h-full">
                                    DEPARTEMENT MANAGER
                                </div>
                            </Td>
                            <Td colSpan={3}>
                                <div className="flex justify-center items-end min-h-full">
                                    DIRECTOR
                                </div>
                            </Td>
                        </tr>
                    </tfoot>
                </Table>
            </div>
        </>
    );
});

export default Print;
