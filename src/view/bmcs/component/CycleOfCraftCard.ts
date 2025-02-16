import { DomNode, el } from "@hanul/skynode";
import CommonUtil from "../../../CommonUtil";
import CycleContract from "../../../contracts/CycleContract";
import Klaytn from "../../../klaytn/Klaytn";
import Wallet from "../../../klaytn/Wallet";
import Alert from "../../shared/Alert";
import ViewUtil from "../../ViewUtil";


export default class CycleOfCraftCard extends DomNode {

    constructor(id: number, metadata: any, currentBlock: number, startBlock: number, level: number, claimableCount: number) {
        super(".cycle-of-craft-card");

        if (startBlock === 0 || level === 0) {
            level = parseInt((metadata.attributes.find((a: any) => a.trait_type === "Crafting Speed")?.value.substring("Level ".length)));
            this.append(
                el(".info-container",
                    el("img", { src: metadata.image, alt: "bmcs" }, { click: () => ViewUtil.go(`/bmcs/mates/${id}`) }),
                    el(".title", metadata.name),
                    el("a", "채굴 시작", {
                        click: async () => {
                            const owner = await Wallet.loadAddress();
                            if (owner !== undefined) {
                                const startBlock = await Klaytn.loadBlockNumber();
                                const results = await (await fetch("https://api.dogesound.club/sign-set-level?" + new URLSearchParams({
                                    owner, id: String(id), startBlock: String(startBlock), speed: String(level),
                                }))).text();
                                await CycleContract.setLevel(id, startBlock, level, results);
                                ViewUtil.waitTransactionAndRefresh();
                            }
                        },
                    }),
                ),
                el(".progress-container",
                    el("img", { src: "/images/view/bmcs/cycle-of-craft/loading.png", alt: "loading" }),
                    el(".progress"),
                    el(".content",
                        el("p", "합성된 BMCS는 채굴 시작 트랜잭션이 필요합니다."),
                    ),
                ),
            );
        }

        else {

            let speed = 0;
            if (level === 1) {
                speed = 1;
            } else if (level === 2) {
                speed = 2;
            } else if (level === 3) {
                speed = 3;
            } else if (level === 4) {
                speed = 4;
            } else if (level === 5) {
                speed = 5;
            } else if (level === 6) {
                speed = 10;
            } else if (level === 7) {
                speed = 10;
            }

            const pointPerEngine = 60 * 86400;
            const acc = (currentBlock - startBlock) * speed % pointPerEngine;

            let bar;
            this.append(
                el(".info-container",
                    el("img", { src: metadata.image, alt: "bmcs" }, { click: () => ViewUtil.go(`/bmcs/mates/${id}`) }),
                    el(".title", metadata.name),
                    el("a", "엔진 받기", {
                        click: () => {
                            new Alert("엔진 받기가 아직 활성화되지 않았습니다.");
                        },
                    }),
                ),
                el(".progress-container",
                    el("img", { src: "/images/view/bmcs/cycle-of-craft/loading.png", alt: "loading" }),
                    el(".progress",
                        bar = el(".bar"),
                    ),
                    el(".content",
                        el(".title", "휙득까지 남은 Block"),
                        el("p", CommonUtil.numberWithCommas(String((pointPerEngine - acc) / speed))),
                        el(".title", "제작 완료된 엔진 수"),
                        el("p", CommonUtil.numberWithCommas(String(claimableCount))),
                    ),
                ),
            );

            bar.style({
                width: `${acc / pointPerEngine * 100}%`,
            });
        }
    }
}
