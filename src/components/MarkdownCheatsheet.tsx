import Typography from '@mui/material/Typography';

const MarkdownCheatsheet = () => (
  <div style={{ padding: '16px', maxWidth: '300px' }}>
    <Typography variant="h6">Markdown Cheatsheet</Typography>
    <Typography variant="body2">
      <strong>Lists</strong>
      <ul>
        <li>Unordered list item</li>
        <li>Unordered list item</li>
        <li>Unordered list item</li>
      </ul>
      <strong>Formatting</strong>
      <ul>
        <li><em>This text will be italic</em> (_This text will be italic_ or *This text will be italic*)</li>
        <li><strong>This text will be bold</strong> (__This text will be bold__ or **This text will be bold**)</li>
      </ul>
    </Typography>
  </div>
);

export default MarkdownCheatsheet;