import { Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import type React from 'react';

export type InfoBannerProps = {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  tone?: 'info' | 'success' | 'warning';
};

export const InfoBanner = ({ icon, title, description, actionLabel, onAction, tone = 'info' }: InfoBannerProps) => (
  <Card
    sx={{
      background: (theme) =>
        theme.palette.mode === 'light'
          ? `linear-gradient(135deg, ${theme.palette[tone].light}33, ${theme.palette.background.paper})`
          : `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette[tone].dark}33)`,
      border: (theme) => `1px solid ${theme.palette.divider}`,
    }}
  >
    <CardContent>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
        {icon && <Stack color={`${tone}.main`}>{icon}</Stack>}
        <Stack spacing={0.5} flex={1}>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Stack>
        {actionLabel && (
          <CardActions sx={{ p: 0 }}>
            <Button variant="contained" color={tone} onClick={onAction}>
              {actionLabel}
            </Button>
          </CardActions>
        )}
      </Stack>
    </CardContent>
  </Card>
);
