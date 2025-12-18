import { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SolarPower, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from './useAuth';
import { useNavigate, useLocation } from 'react-router-dom';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Minimum 6 characters'),
  remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = useMemo(
    () =>
      (location.state as { from?: { pathname?: string } } | undefined)?.from
        ?.pathname ?? '/dashboard',
    [location],
  );
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', remember: true },
  });

  const onSubmit = async (values: FormValues) => {
    await login(values.email, values.password);
    navigate(from, { replace: true });
  };

  return (
    <Card sx={{ p: 1.5, boxShadow: 12, borderRadius: 3 }}>
      <CardContent>
        <Stack spacing={3}>
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
              <SolarPower color="primary" />
              <Typography variant="h6">Solar Monitor</Typography>
            </Stack>
            <Typography variant="h4" gutterBottom>
              Welcome back
            </Typography>
            <Typography color="text.secondary">
              Sign in to monitor your photovoltaic assets.
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
              <TextField
                label="Email"
                placeholder="you@solar.com"
                type="email"
                fullWidth
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email')}
              />
              <TextField
                label="Password"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Remember me"
                  {...register('remember')}
                />
                <Typography variant="body2" color="primary">
                  Forgot password?
                </Typography>
              </Stack>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in...' : 'Sign in'}
              </Button>
            </Stack>
          </form>
        </Stack>
      </CardContent>
    </Card>
  );
};
