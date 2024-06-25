<style scoped>
	.textBlock {
		font-size: v-bind('getFontSize');
	}
	.rectBlock {
		height: v-bind('getFontSize');
		width: 100px;
	}
</style>

<template>
	<div
		class="full absolute flex flex-col justify-center items-center whitespace-nowrap overflow-hidden"
	>
		<svg
			:class="`absolute overflow-hidden font-['Consolas'] -rotate-[${angle}deg]`"
			ref="main"
		>
			<defs>
				<mask id="binaryDefs">
					
				</mask>
			</defs>
			<rect
				class="fill-[#370037] dark:fill-white full"
				style="mask: url(#binaryDefs)"
				ref="rect"
			></rect>
		</svg>
	</div>
</template>

<script lang="ts">
	import { getRandomInt, replaceAt } from '@ts/core/utils';
	import { ref } from 'vue';

	export default {
		setup() {
			const stringLength = ref<number>(),
				addRowNum = ref<number>(),
				prevSpeed = ref<number>(),
				main = ref<HTMLElement>(),
				rect = ref<HTMLElement>(),
				def = ref<HTMLElement>();

			return { stringLength, addRowNum, prevSpeed, main, rect, def };
		},
		data() {
			const fontSize = 37;
			return {
				getFontSize: `${fontSize}px`,
				getFontWidth: fontSize / 2,
				getFontHeight: fontSize * (3 / 4),
				angle: 1,
			};
		},
		mounted() {
			this.stringLength = 10;
			this.prevSpeed = this.initSpeed();
			this.updateCombo();
		},
		methods: {
			initSpeed() {
				return (this.stringLength! * this.getFontWidth) / 3;
			},
			numRow() {
				return (
					(this.$el as HTMLElement).offsetHeight /
						(this.getFontHeight / this.angle.ra().c()) +
					1
				);
			},
			textLength() {
				return (
					(this.$el as HTMLElement).offsetWidth /
					(this.getFontWidth * this.angle.ra().c())
				);
			},
			generateBinary(previous = '') {
				let output = previous;
				if (previous == '') {
					for (let i = 0; i < this.stringLength!; i++) output += `${getRandomInt(2)}`;
				} else {
					let numChange = previous.length * (9 / 100);
					do {
						numChange -= 1;
						let pos = getRandomInt(previous.length);
						output = replaceAt(output, pos, `${(parseInt(previous[pos]) + 1) % 2}`);
					} while (numChange > 0);
				}
				while (output.length < this.textLength()) {
					output += `${getRandomInt(2)}`;
				}
				this.stringLength = output.length;
				return output;
			},
			generateSVGBlock(id: number, speed: number) {
				const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
				svgEl.id = `svg-${id}`;
				svgEl.setAttribute('y', `${id * this.getFontHeight}px`);
				svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

				const defsEl = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
				svgEl.appendChild(defsEl);

				const maskEl = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
				maskEl.id = `mask-${id}`;
				defsEl.appendChild(maskEl);

				const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
				textEl.setAttribute('x', '50%');
				textEl.setAttribute('y', `${this.getFontWidth}`);
				textEl.setAttribute('dominant-baseline', 'middle');
				textEl.setAttribute('text-anchor', 'middle');
				textEl.classList.add('fill-white', 'rectBlock', 'textBlock');
				textEl.id = `text-${id}`;
				textEl.textContent = this.generateBinary();
				maskEl.appendChild(textEl);

				const rectBlock3 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				rectBlock3.setAttribute('class', 'fill-white rectBlock');
				svgEl.appendChild(rectBlock3);

				const rectBlock1El = document.createElementNS(
					'http://www.w3.org/2000/svg',
					'rect',
				);
				rectBlock1El.classList.add(
					'fill-black',
					`animate-[marquee1_${speed}s_linear_infinite]`,
					'rectBlock',
				);
				rectBlock1El.style.mask = `url(#mask-${id})`;
				svgEl.appendChild(rectBlock1El);

				const rectBlock2El = document.createElementNS(
					'http://www.w3.org/2000/svg',
					'rect',
				);
				rectBlock2El.classList.add(
					'fill-black',
					`animate-[marquee2_${speed}s_linear_infinite]`,
					'rectBlock',
				);
				rectBlock2El.style.mask = `url(#mask-${id})`;
				svgEl.appendChild(rectBlock2El);

				return svgEl;
			},
			initBinaryRows(from = 0) {
				if (this.addRowNum! >= this.numRow()) return;
				this.addRowNum = this.numRow();
				for (let i = from; i < this.addRowNum; i++) {
					const curSpeed =
							this.prevSpeed! +
							(getRandomInt(this.initSpeed() / 100) + 1) * (getRandomInt(2) ? -1 : 1),
						text = this.generateSVGBlock(i, curSpeed);

					document.getElementById('binaryDefs')!.appendChild(text);
					this.prevSpeed = curSpeed;
				}
			},
			async updateCombo() {
				this.initBinaryRows(this.addRowNum);

				// textResize();
				this.rect!.style.width = `${(
					`text-${this.addRowNum?.r()! - 1}`.getElement() as SVGTextContentElement
				).getComputedTextLength()}`;
				this.rect!.style.height = `${this.addRowNum! * this.getFontHeight!}`;
				this.resizeSVG();
			},
			resizeSVG() {
				const box = (this.main as unknown as SVGGraphicsElement).getBBox();
				this.main!.setAttribute('width', `${box.x + box.width + box.x}`);
				this.main!.setAttribute('height', `${box.y + box.height + box.y}`);
			},
			textResize() {
				$('.textBlock').css('font-size', this.getFontSize + 'px');
				$('.rectBlock').css('height', this.getFontSize + 'px');
				$('.rectBlock').css(
					'width',
					`text-${0}`.getElement().getComputedTextLength() + 'px',
				);
			},
		},
	};
</script>
