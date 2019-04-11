import React from 'react'
import { withDropdown } from '../comp/module'
import '../style/theme.scss'

const View = () => {
	return (
		<div className="siteView p1" style={{textAlign: 'center'}}>
			{withDropdown(<div style={{width: '400px', display: 'inline-block', border: '1px solid green'}}>This is inner div withDropdown</div>,
				<div>This is the dropdown should appear if click</div>,
				{
					edge: 'TOP',
					align: 'LEFT',
				}, true)}
			{withDropdown(<div style={{width: '400px', display: 'inline-block', border: '1px solid green'}}>This is inner div withDropdown</div>,
				<div>This is the dropdown should appear if click</div>,
				{
					edge: 'TOP',
					align: 'CENTER',
				}, true)}
			{withDropdown(<div style={{width: '400px', display: 'inline-block', border: '1px solid green'}}>This is inner div withDropdown</div>,
				<div>This is the dropdown should appear if click</div>,
				{
					edge: 'TOP',
					align: 'RIGHT',
				}, true)}
			{withDropdown(<div style={{width: '400px', display: 'inline-block', border: '1px solid green'}}>This is inner div withDropdown</div>,
				<div>This is the dropdown should appear if click</div>,
				{
					edge: 'BOTTOM',
					align: 'LEFT',
				}, true)}
			{withDropdown(<div style={{width: '400px', display: 'inline-block', border: '1px solid green'}}>This is inner div withDropdown</div>,
				<div>This is the dropdown should appear if click</div>,
				{
					edge: 'BOTTOM',
					align: 'CENTER',
				}, true)}
			{withDropdown(<div style={{width: '400px', display: 'inline-block', border: '1px solid green'}}>This is inner div withDropdown</div>,
				<div>This is the dropdown should appear if click</div>,
				{
					edge: 'BOTTOM',
					align: 'RIGHT',
				}, true)}
			{withDropdown(<div style={{width: '400px', display: 'inline-block', border: '1px solid green'}}>This is inner div withDropdown</div>,
				<div>This is the dropdown should appear if click</div>,
				{
					edge: 'LEFT',
					align: 'TOP',
				}, true)}
			{withDropdown(<div style={{width: '400px', display: 'inline-block', border: '1px solid green'}}>This is inner div withDropdown</div>,
				<div>This is the dropdown should appear if click</div>,
				{
					edge: 'LEFT',
					align: 'CENTER',
				}, true)}
			{withDropdown(<div style={{width: '400px', display: 'inline-block', border: '1px solid green'}}>This is inner div withDropdown</div>,
				<div>This is the dropdown should appear if click</div>,
				{
					edge: 'LEFT',
					align: 'BOTTOM',
				}, true)}
			{withDropdown(<div style={{width: '400px', display: 'inline-block', border: '1px solid green'}}>This is inner div withDropdown</div>,
				<div>This is the dropdown should appear if click</div>,
				{
					edge: 'RIGHT',
					align: 'TOP',
				}, true)}
			{withDropdown(<div style={{width: '400px', display: 'inline-block', border: '1px solid green'}}>This is inner div withDropdown</div>,
				<div>This is the dropdown should appear if click</div>,
				{
					edge: 'RIGHT',
					align: 'CENTER',
				}, true)}
			{withDropdown(<div style={{width: '400px', display: 'inline-block', border: '1px solid green'}}>This is inner div withDropdown</div>,
				<div>This is the dropdown should appear if click</div>,
				{
					edge: 'RIGHT',
					align: 'BOTTOM',
				}, true)}
		</div>
	)
}

export default View