
<template>
	<div class="error flex flex-center">
		<div class="error-wrapper">
			<div class="error-groups pd-14">
				<div class="error-banner pd-14">
					<div class="avatar-wrapper flex flex-center">
						<img class="avatar-image" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDUwNS43NiA1NDkuMzgiPgo8cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUYyRjIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9Ijg2LjgsMTQyIDE0LjIsMTgyLjQgMTUsMTM1LjIgODEuMSw4NCIvPgo8cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUYyRjIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjcuMSw4LjEgNjIuMSw5NCA4MS4yLDc5LjciLz4KPHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjFGMkYyIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSI4NC4yLDgxLjcgOTAuNywxNDIuMyA3OC45LDMwMS45IDEzNi4yLDI3MS4zIDE2Mi44LDE3Mi45IDEyNC45LDk4LjciLz4KPHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjFGMkYyIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIxNjksMjUyLjMgMTM5LjYsMjY5LjEgMTY1LjQsMTc0LjMgMjAyLjMsMTc3LjciLz4KPHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjFGMkYyIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIxNjUuOCwyNTguNyA3OC45LDMwNy43IDExNS45LDMyNi40IDM2LjMsNTQyIDIwMC4zLDM3OS43IDE2OC42LDM4Mi40Ii8+Cjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRjJGMiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iMTc0LjQsMzc3LjggMTg5LjksMzYzIDIwMS43LDM3NS44Ii8+Cjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRjJGMiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iMTY5LjksMjU5LjMgMTcyLjQsMzc0IDIyMS4yLDMyOS4zIi8+Cjxwb2x5Z29uIGZpbGw9Im5vbmUiIHN0cm9rZT0iI0YxRjJGMiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHBvaW50cz0iMTcxLjQsMjU1LjUgMjA0LjQsMjI3LjUgMjIxLjIsMzIzLjgiLz4KPHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjFGMkYyIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyMDcuOSwyMjkgMjIxLjcsMzAzLjkgMjU1LjIsMjc5LjUiLz4KPHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjFGMkYyIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyMjIuNCwzMDcuNSAyMjYuMiwzMjkuMyAxOTMuMiwzNjAuMyAxOTYuNiwzNjQgMjM0LjcsMzM2LjggMzYzLjQsMzI5LjkgMjQ4LjIsMjY2LjUgMjYwLjQsMjc5LjgiLz4KPHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjFGMkYyIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIxOTguMywzNjYgMjA1LjIsMzc0LjMgMzUyLjQsMzMzLjcgMjM1LjksMzM5LjgiLz4KPHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjFGMkYyIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyMjYuMiwyNDMuOCAyNDAuOSwyNTkuMyAzNjMuNCwzMjYuOSAyNDguNywyMzQiLz4KPHBvbHlnb24gZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRjFGMkYyIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyNzkuMSwyNTQuNSAzNTkuNCwzMjAuMyAzMTIuNywyNTQuNSIvPgo8cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUYyRjIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjMxNi45LDI1NC41IDM3MS42LDMzMi40IDI3MC45LDM1OS43IDMxMC4zLDQxNy43IDM4My42LDQwMi40IDM3Ny42LDM1NC40IDUwMC45LDM5OCAzNzAuNiwyNjIuNyIvPgo8cG9seWdvbiBmaWxsPSJub25lIiBzdHJva2U9IiNGMUYyRjIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBwb2ludHM9IjMxNi42LDQxOS43IDM5OC4zLDU0MiAzODIuMyw0MDYuNCIvPgo8L3N2Zz4K" />
						<div class="avatar-cover"></div>
					</div>
				</div>
				<div class="error-single pd-14">
					<slot name="default">
						OOPS! Something Wrong <i class="bx bx-sad"></i>
					</slot>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	
	/*
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 * Error Styling
	 * -------------------------------------------------------------------------------------------------------------------------------------------
	 *
	 */
	.error {
		width: 100vw;
		height: 85vh;
		background: var(--background-2);
	}
		.error-wrapper {
			width: 70%;
			height: fit-content;
		}
		@media (max-width: 750px) {
			.error-wrapper {
				width: 100%;
			}
		}
			.error-groups {
				background: var(--background-2);
			}
				.error-banner {
					width: auto;
					height: 680px;
				}
				@media (max-width: 750px) {
					.error-banner {
						height: 340px;
					}
				}
					.avatar-wrapper {
						width: 100%;
						height: 100%;
					}
				.error-single {
					text-align: center;
				}
	
</style>
