import React, {useEffect, useState} from "react";
import {DietaryRestriction, PatchDietaryRestriction} from "../api/types.ts";
import {getDietaryRestrictions, patchDietaryRestrictions} from "../api";
import {Card} from "../components/common/Card.tsx";
import {Button} from "../components/common/Button.tsx";
import {useLocalStorage} from "../hooks/useLocalStorage.ts";
import {useNavigate} from "react-router-dom";

export function RestrictionPage() {
    const [allRestrictions, setAllRestrictions] = useState<DietaryRestriction[]>()
    const [storedRestrictions, setStoredRestrictions] = useLocalStorage("restrictions")
    const navigate = useNavigate()

    useEffect(() => {
        getDietaryRestrictions().then(result => {
            setAllRestrictions(result.body)
        })
    }, [])

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const restrictionCheckboxes = Array.from(event.currentTarget.querySelectorAll("input[type=checkbox]")).map(elem => elem as HTMLInputElement)
        const selectedIds = restrictionCheckboxes.filter(checkbox => checkbox.checked).map(checkbox => {
            return checkbox.value
        })
        const unselectedIds = restrictionCheckboxes.filter(checkbox => !checkbox.checked).map(checkbox => {
            return checkbox.value
        })
        const patches: PatchDietaryRestriction[] = []
        const parsedStoredRestrictions = storedRestrictions ? storedRestrictions as string[] : []
        for (let selectedId of selectedIds) {
            if (!parsedStoredRestrictions.includes(selectedId)) {
                patches.push({uuid: selectedId, action: "ADD"})
            }
        }

        for (let unselectedId of unselectedIds) {
            if (parsedStoredRestrictions.includes(unselectedId)) {
                patches.push({uuid: unselectedId, action: "REMOVE"})
            }
        }

        patchDietaryRestrictions(patches).then(result => {
            if (result.status === 202) {
                setStoredRestrictions(selectedIds)
                navigate("/")
            }
        })
    }

    return <div className={"flex items-center justify-center flex-1"}>
        <Card className={"h-fit w-[400px] flex flex-col items-center"}>
            <div className={"text-2xl text-slate-700 text-center mb-2"}>Restrictions</div>
            <div className={"text-sm text-slate-400 mb-4"}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut
                labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
                ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
            </div>
            <form className={"w-full flex flex-col items-center gap-4"} onSubmit={handleSubmit}>
                <div className={"gap-2 flex flex-col"}>
                    {allRestrictions?.sort((a, b) => a.label.localeCompare(b.label)).map(restriction =>
                        <div key={restriction.uuid} className={"flex flex-row gap-2 items-center"}>
                            <input id={restriction.uuid} value={restriction.uuid} type="checkbox" defaultChecked={(storedRestrictions ? storedRestrictions as string[] : []).includes(restriction.uuid) }
                                   className={"w-4 h-4 text-blue-400 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500"}/>
                            <label
                                htmlFor={restriction.uuid} className={"px-2 py-0.5 w-fit rounded-md"}
                                style={{backgroundColor: restriction.color}}>{restriction.label}</label>
                        </div>
                    )}
                </div>
                <Button type="submit" className={"w-full"}>Speichern und weiter</Button>
            </form>
        </Card>
    </div>
}